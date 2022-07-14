function GetQueryURL(name) {
    if (
        (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
            location.search
        ))
    )
        return decodeURIComponent(name[1]);
}

export default GetQueryURL;
