export async function sendCheckin(data: {
  gymId: string
  userId: string
  latitude: number
  longitude: number
  userLatitude: number
  userLongitude: number
  token: string
}) {
  const response = await fetch(`${process.env.EXPO_PUBLIC_HOST_API}/checkins`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refreshToken=${data.token}`,
    },
    body: JSON.stringify({
      gymId: data.gymId,
      userId: data.userId,
      latitude: data.latitude,
      longitude: data.longitude,
      userLatitude: data.userLatitude,
      userLongitude: data.userLongitude,
    }),
  })

  const responseData = await response.json()
  const status = response.status

  if (status === 201) {
    responseData.message = 'Check-in successful'
  }

  return {
    responseData,
    status,
  }
}
