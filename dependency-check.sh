#!/usr/bin/env bash

# Copyright (C) 2023 Peter Mosmans [Go Forward]
# SPDX-License-Identifier: GPL-3.0-or-later

# Stop when encountering an error
set -e

VERSION="8.4.0"
if [ ! -d reports ]; then
  mkdir -p reports 1> /dev/null
fi

# A named volume will be used/created, to store downloaded feeds

# Source is mounted read-only
docker run --rm --volume "$PWD":/src:ro \
  --volume dependency-check-data:/usr/share/dependency-check/data:rw \
  --volume "$PWD/reports":/reports:rw \
  "owasp/dependency-check:$VERSION" \
  --scan /src --out /reports
