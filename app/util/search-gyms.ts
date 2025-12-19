export async function searchGyms(data: {
  query: string;
  page?: number;
  token: string;
}) {
  const page = data.page ?? 1;
  const url = new URL(`${process.env.EXPO_PUBLIC_HOST_API}/gyms/search`);
  url.search = new URLSearchParams({
    query: data.query ?? '',
    page: page.toString(),
  }).toString();

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Cookie: `refreshToken=${data.token}`,
    },
  });

  const gyms = await response.json();
  return gyms;
}
