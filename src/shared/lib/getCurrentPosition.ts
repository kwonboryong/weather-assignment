export type Coords = { lat: number; lon: number };

export function getCurrentPosition(): Promise<Coords> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("이 브라우저는 위치 기능을 지원하지 않아요."));

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => reject(new Error(err.message || "위치 권한이 필요해요.")),
      { timeout: 10_000 }
    );
  });
}
