export async function fetchNearbyGym(data: {
  latitude: number
  longitude: number
  page: number
  token: string
}) {
  const url = new URL('http://192.168.0.67:8080/gyms/nearby')
  url.search = new URLSearchParams({
    latitude: data.latitude.toString(),
    longitude: data.longitude.toString(),
    page: data.page.toString(),
  }).toString()
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Cookie: `refreshToken=${data.token}`,
    },
  })
  const gyms = await response.json()
  console.log(`gyms: ${JSON.stringify(gyms)}`)

  return gyms
}
