function UpdateCard({ username, points, rank, description }) {
    return (
        <div style={cardStyles.container}>
            <div style={cardStyles.header}>
                <div style={{ ...cardStyles.circle, backgroundColor: "#6EE7B7" }}></div>

                <div style={cardStyles.textContainer}>
                    <div style={cardStyles.userRow}>
                        <span style={cardStyles.username}>{username}</span>
                        <span style={cardStyles.rank}>#{rank}</span>
                    </div>
                    <p style={cardStyles.points}>+ {points} points</p>
                </div>
            </div>

            <p style={cardStyles.description}>{description}</p>
        </div>
    );
}

const cardStyles = {
    container: {
        backgroundColor: "#D9D9D9",
        padding: "15px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "250px",
        margin: "15px auto",
        fontFamily: "'Arial', sans-serif",
    },
    header: {
        display: "flex",
        gap: "10px",
    },
    circle: {
        width: "45px",
        height: "45px",
        borderRadius: "50%",
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        
    },
    userRow: {
        display: "flex",
        alignItems: "center",
        gap: "100%",
    },
    username: {
        fontWeight: "bold",
    },
    rank: {
        textAlign: "left",
        marginLeft: "auto",
        color: "#555",
    },
    points: {
        textAlign: "left", // Aligns text to the left
        marginTop: "0px",
        fontSize: "11px",
        color: "#666",
    },
    description: {
        margin: "0 auto",
        textAlign: "left", // Aligns text to the left
        width: "90%", // Ensures text takes full width
        fontSize: "14px",
        color: "#000",
    },
};

export default UpdateCard;