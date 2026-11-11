package routes

import (
	"crypto/subtle"
	"log"
	"net/http"
	"os"
)

// requireWriteKey guards the routes that change data. The caller must send
// "Authorization: Bearer <API_WRITE_KEY>". Only the Next.js server holds the
// key; browsers never see it, so they cannot call these routes directly.
//
// If API_WRITE_KEY is not set, writes are refused outright rather than left
// open — a missing env var must not turn into a public delete button.
func requireWriteKey(next http.HandlerFunc) http.HandlerFunc {
	key := os.Getenv("API_WRITE_KEY")
	if key == "" {
		log.Println("WARNING: API_WRITE_KEY is not set — create, update and delete are disabled")
	}
	expected := []byte("Bearer " + key)

	return func(w http.ResponseWriter, r *http.Request) {
		if key == "" {
			http.Error(w, "writes are disabled", http.StatusServiceUnavailable)
			return
		}
		got := []byte(r.Header.Get("Authorization"))
		if subtle.ConstantTimeCompare(got, expected) != 1 {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}
		next(w, r)
	}
}
