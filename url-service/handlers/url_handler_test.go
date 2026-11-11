package handlers

import (
    "bytes"
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestProcessURL(t *testing.T) {
    tests := []struct {
        name           string
        requestBody    Request
        expectedStatus int
        expectedURL    string
    }{
        {
            name: "All operation",
            requestBody: Request{
                URL:       "https://BYFOOD.com/food-EXPeriences?query=abc/",
                Operation: "all",
            },
            expectedStatus: http.StatusOK,
            expectedURL:    "https://www.byfood.com/food-experiences",
        },
        {
            name: "Canonical operation",
            requestBody: Request{
                URL:       "https://BYFOOD.com/food-EXPeriences?query=abc/",
                Operation: "canonical",
            },
            expectedStatus: http.StatusOK,
            expectedURL:    "https://BYFOOD.com/food-EXPeriences",
        },
        {
            name: "Redirection operation",
            requestBody: Request{
                URL:       "https://BYFOOD.com/food-EXPeriences?query=abc/",
                Operation: "redirection",
            },
            expectedStatus: http.StatusOK,
            expectedURL:    "https://www.byfood.com/food-experiences",
        },
        {
            name: "javascript URL is rejected",
            requestBody: Request{
                URL:       "javascript:alert(1)",
                Operation: "all",
            },
            expectedStatus: http.StatusBadRequest,
        },
        {
            name: "data URL is rejected",
            requestBody: Request{
                URL:       "data:text/html,<script>alert(1)</script>",
                Operation: "redirection",
            },
            expectedStatus: http.StatusBadRequest,
        },
        {
            name: "Relative URL is rejected",
            requestBody: Request{
                URL:       "/food-experiences",
                Operation: "canonical",
            },
            expectedStatus: http.StatusBadRequest,
        },
        {
            name: "Invalid operation",
            requestBody: Request{
                URL:       "https://BYFOOD.com/food-EXPeriences?query=abc/",
                Operation: "invalid",
            },
            expectedStatus: http.StatusBadRequest,
            expectedURL:    "",
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            body, _ := json.Marshal(tt.requestBody)
            req, err := http.NewRequest("POST", "/process-url", bytes.NewBuffer(body))
            if err != nil {
                t.Fatal(err)
            }

            rr := httptest.NewRecorder()
            handler := http.HandlerFunc(ProcessURL)
            handler.ServeHTTP(rr, req)

            if status := rr.Code; status != tt.expectedStatus {
                t.Errorf("handler returned wrong status code: got %v want %v",
                    status, tt.expectedStatus)
            }

            if tt.expectedStatus == http.StatusOK {
                var resp Response
                if err := json.NewDecoder(rr.Body).Decode(&resp); err != nil {
                    t.Fatal(err)
                }
                if resp.ProcessedURL != tt.expectedURL {
                    t.Errorf("handler returned unexpected body: got %v want %v",
                        resp.ProcessedURL, tt.expectedURL)
                }
            }
        })
    }
}
