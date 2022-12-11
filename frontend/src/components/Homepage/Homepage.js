import "./Homepage.css"

const Homepage = () => {
    return (
        <div><div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
            <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/17204/production/_90842749_gamescom_16_019_093.jpg"
                style={{ width: 800, height: 450, borderRadius: 4 }} alt="crowd of listeners" />
        </div>
            <div style={{ textAlign: "center",backgroundColor: "#333", marginTop: 8, color: "#fff" }}>
                Soundcloud Clone | Author : David Pratt
            </div>
        </div>);
}

export default Homepage;