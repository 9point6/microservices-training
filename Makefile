export GOBIN=$(shell pwd)/go-bin

prerequisites:
	docker pull progrium/consul

build-nitro-go:
	go install go/nitro-gateway.go

build-docker: prerequisites
	docker-compose create
	docker-compose build
	docker-compose up
