
const getData = async (url)=>{
    try {
        let res = await fetch(url,{
            method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

        });
        let data = await res.json();
        return  data;

    } catch (error) {
       console.log(error); 
    }
}


export default getData;