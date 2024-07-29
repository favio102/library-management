package utils

import (
    "net/url"
    "strings"
)

func CanonicalURL(rawURL string) string {
    u, err := url.Parse(rawURL)
    if err != nil {
        return rawURL
    }

    // Remove query parameters
    u.RawQuery = ""
    // Remove trailing slash
    u.Path = strings.TrimSuffix(u.Path, "/")
    return u.String()
}

func RedirectURL(rawURL string) string {
    u, err := url.Parse(rawURL)
    if err != nil {
        return rawURL
    }

    // Convert to lowercase
    u.Host = strings.ToLower(u.Host)
    u.Path = strings.ToLower(u.Path)

    // Ensure domain is www.byfood.com
    u.Host = "www.byfood.com"
    
    // Remove query parameters
    u.RawQuery = ""
    // Remove trailing slash
    u.Path = strings.TrimSuffix(u.Path, "/")
    
    return u.String()
}
