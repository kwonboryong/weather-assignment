export function mapGeolocationError(message: string) {
  const m = message.toLowerCase();

  if (m.includes("denied")) {
    return "위치 권한이 거부되었습니다. 브라우저 설정에서 위치 접근을 허용해 주세요.";
  }

  if (m.includes("unavailable")) {
    return "현재 위치를 가져올 수 없습니다. 잠시 후 다시 시도해 주세요.";
  }

  if (m.includes("timeout")) {
    return "위치 확인 시간이 초과되었습니다. 다시 시도해 주세요.";
  }

  return "위치 정보를 가져오지 못했습니다.";
}
