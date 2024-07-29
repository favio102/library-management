package handlers

import (
    "encoding/json"
    "net/http"
    "url-cleanup/utils"
)

type Request struct {
    URL       string `json:"url"`
    Operation string `json:"operation"`
}

type Response struct {
    ProcessedURL string `json:"processed_url"`
}

// ProcessURL godoc
// @Summary Process URL
// @Description Process the URL according to the given operation type.
// @Accept  json
// @Produce  json
// @Param   request body Request true "URL and operation type"
// @Success 200 {object} Response
// @Failure 400 {string} string "Invalid request payload"
// @Failure 500 {string} string "Failed to send response"
// @Router /process-url [post]
func ProcessURL(w http.ResponseWriter, r *http.Request) {
    var req Request
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }

    var processedURL string
    switch req.Operation {
    case "redirection":
        processedURL = utils.RedirectURL(req.URL)
    case "canonical":
        processedURL = utils.CanonicalURL(req.URL)
    case "all":
        processedURL = utils.CanonicalURL(req.URL)
        processedURL = utils.RedirectURL(processedURL)
    default:
        http.Error(w, "Invalid operation type", http.StatusBadRequest)
        return
    }

    resp := Response{ProcessedURL: processedURL}
    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(resp); err != nil {
        http.Error(w, "Failed to send response", http.StatusInternalServerError)
    }
}
