export GOBIN=$(shell pwd)/go-bin

build:
	go install go/nitro-gateway.go
