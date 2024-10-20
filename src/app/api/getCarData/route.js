export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const trim = searchParams.get("trim");
    const city = searchParams.get("city");
    const state = searchParams.get("state");
  
    if (!year || !make || !model || !trim || !city || !state) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }
  
    try {
      const apiKey = "9fLQJqUmJ2mIkebIR97kTqQxa1tTlB7I"; // Replace this with your actual API key
      const url = `https://mc-api.marketcheck.com/v2/sales/car?api_key=${apiKey}&ymmt=${year}|${make}|${model}|${trim}&city_state=${city}|${state}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if (!response.ok) {
        return new Response(
          JSON.stringify({ message: "Error fetching data from MarketCheck API" }),
          { status: 500 }
        );
      }
  
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Server error" }), {
        status: 500,
      });
    }
  }
  