if [ "$DOCK_ENV" = "LOCAL" ]; then
  test $(curl -k -s -o /dev/null -w "%{http_code}" https://localhost) = "401"
elif [ "$DOCK_ENV" = "DEV" ]; then
  test $(curl -s -o /dev/null -w "%{http_code}" https://dev.zapomnigo.com) = "401"
elif [ "$DOCK_ENV" = "PROD" ]; then
  curl -f https://zapomnigo.com
else
  echo "Unknown DOCK_ENV: $DOCK_ENV"
  exit 1
fi