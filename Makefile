export GOBIN=$(shell pwd)/go-bin

prerequisites:
	docker pull progrium/consul

build-nitro-go:
	go install go/nitro-gateway.go

build-docker-nitro: prerequisites
	docker build -t nitro-gateway -f docker/nitro-gateway/Dockerfile .
