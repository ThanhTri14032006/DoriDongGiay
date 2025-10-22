#!/usr/bin/env bash
set -euo pipefail

# Simple runner to start Backend (dotnet) and Frontend (static) together
# Ports:
# - Backend: http://localhost:5002
# - Frontend: http://localhost:3000

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
BE_DIR="$ROOT_DIR/DoriDongGiayBackend"
FE_DIR="$ROOT_DIR/DoriDongGiayFrontend"

# Ensure we kill background jobs on exit
pids=()
cleanup() {
  echo "\nStopping services..."
  for pid in "${pids[@]}"; do
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" || true
    fi
  done
}
trap cleanup EXIT

# Start Backend
(
  cd "$BE_DIR"
  echo "Starting backend on http://localhost:5002"
  dotnet run --urls="http://localhost:5002"
) &
pids+=("$!")

# Start Frontend
(
  cd "$FE_DIR"
  echo "Starting frontend on http://localhost:3000"
  python3 -m http.server 3000
) &
pids+=("$!")

# Print helpful info
cat <<EOF

Services starting:
- Backend: http://localhost:5002/api/productsapi
- Frontend: http://localhost:3000/products.html

Press Ctrl+C to stop both.
EOF

# Wait on background processes
wait