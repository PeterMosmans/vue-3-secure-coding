#!/usr/bin/env bash

# Copyright (C) 2023 Peter Mosmans [Go Forward]
# SPDX-License-Identifier: GPL-3.0-or-later

# Stop when encountering an error
set -e
# Stop when not all variables are defined

source .env.development.local
npx json-server -H "$API_HOST" -p "$API_PORT" datastore.json
