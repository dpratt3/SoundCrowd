const handleSubmit = (e) => {
    e.preventDefault();
    
    const newSong = {
        title, 
        description, 
        imageUrl, 
        url, 
        albumId 
    };

    dispatchEvent(writeSong(newSong));
    reset();
};