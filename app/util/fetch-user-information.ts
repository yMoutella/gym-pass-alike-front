import AsyncStorage from '@react-native-async-storage/async-storage'

interface getUserInformation {
  email: string
  password: string
}

const getUserInformations = async (credentials: getUserInformation) => {
  try {
    const loginToken = await fetch('http://192.168.0.67:8080/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const tokenData = await loginToken.json()
    const data = {
      status: loginToken.status,
      token: tokenData.token,
    }

    return data
  } catch (error) {}
}

const userMetrics = async () => {
  const userInfo = await fetch('http://192.168.0.67:8080/metrics', {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`,
    },
  })
  const userMetrics = await userInfo.json()

  return userMetrics
}

export { getUserInformations, userMetrics }

