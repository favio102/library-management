// url_service_test.go
package main

import (
    "testing"
)

func TestProcessURL(t *testing.T) {
    tests := []struct {
        url       string
        operation string
        expected  string
    }{
        {"https://BYFOOD.com/food-EXPeriences?query=abc/", "all", "https://www.byfood.com/food-experiences"},
        {"https://BYFOOD.com/food-EXPeriences?query=abc/", "canonical", "https://BYFOOD.com/food-EXPeriences"},
        {"https://BYFOOD.com/food-EXPeriences?query=abc/", "redirection", "https://www.byfood.com/food-experiences"},
    }

    for _, test := range tests {
        result := processURL(test.url, test.operation)
        if result != test.expected {
            t.Errorf("processURL(%q, %q) = %q; expected %q", test.url, test.operation, result, test.expected)
        }
    }
}
