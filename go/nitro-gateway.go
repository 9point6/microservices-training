package main

import (
    "fmt"
    "encoding/json"
    "io/ioutil"
    "net/http"
)

var fakeNitro map[string]interface{}

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func loadFakeNitro() {
    dat, err := ioutil.ReadFile("./fake-nitro.json")
    check(err)

    check(json.Unmarshal(dat, &fakeNitro))
}

func handler(w http.ResponseWriter, r *http.Request) {
    var pid = r.URL.Path[7:]
    w.Header().Set("Content-Type", "application/json")

    if asset, ok := fakeNitro[pid]; ok {
        assetStr, _ := json.Marshal(asset)
        fmt.Fprintf(w, string(assetStr))
    } else {
        fmt.Fprintf(w, "{\"error\":\"asset not found\"}")
    }
}

func main() {
    loadFakeNitro()
    fmt.Println("Nitro Gateway listening on 3001")
    http.HandleFunc("/asset/", handler)
    http.ListenAndServe(":3001", nil)
}
