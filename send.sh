#! /bin/bash

protoc --encode=Command \
	message.proto <<<"
		type: 2
		name: \"Question\"
		data: \"$1\"
	"\
	| nc 127.0.0.1 9987 \
	| protoc --decode=Command message.proto