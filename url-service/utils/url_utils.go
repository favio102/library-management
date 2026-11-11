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

// IsWebURL reports whether rawURL is an absolute http(s) URL with a host.
// Anything else — "javascript:alert(1)", "data:...", "//evil", plain text —
// is rejected, because the processing functions would pass it through
// unchanged and a caller could end up redirecting to it or rendering it as
// a link.
func IsWebURL(rawURL string) bool {
    u, err := url.Parse(rawURL)
    if err != nil {
        return false
    }
    scheme := strings.ToLower(u.Scheme)
    return (scheme == "http" || scheme == "https") && u.Opaque == "" && u.Host != ""
}
