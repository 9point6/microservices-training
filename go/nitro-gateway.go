package main

import (
    "fmt"
    // "encoding/json"
    // "io/ioutil"
    "net/http"
)

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func handler(w http.ResponseWriter, r *http.Request) {

    // dat, err := ioutil.ReadFile("./fake-nitro.json")
    // check(err)
    // fmt.Println(dat)

    // var parsed map[string]interface{}

    // check(json.Unmarshal(dat, &parsed))
    // fmt.Println(parsed)

    fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {
    fmt.Println("Nitro Gateway listening on 3001");
    http.HandleFunc("/", handler)
    http.ListenAndServe(":3001", nil)
}
