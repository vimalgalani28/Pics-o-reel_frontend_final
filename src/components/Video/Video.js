import React from 'react'

const Video = () => {

    return (
        <div style={{ background: 'var(--clr-primary-9)', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', fontSize: '2.5rem', padding: '30px 0' }}>
                How To Vote?
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                <iframe width="70%" style={{ height: "70vh" }}
                    src="https://www.youtube.com/embed/-pW7vSV9KSg"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
        </div>
    )

}

export default Video