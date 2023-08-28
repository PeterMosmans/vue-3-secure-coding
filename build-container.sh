#!/usr/bin/env bash

# Copyright (C) 2023 Peter Mosmans [Go Forward]
# SPDX-License-Identifier: GPL-3.0-or-later

# Stop when encountering an error
set -e
# Stop when not all variables are defined
set -x

source .env.production.local
DOCKER_BUILDKIT=1 docker build -t test --build-arg "API_HOST=${API_HOST}" --build-arg "API_PORT=${API_PORT}" .
