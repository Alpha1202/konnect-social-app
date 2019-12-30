let db = {
    users: [
        {
            userId: 'K0Z4GxLCVtgtANBxigTnf5Caot53',
            email: 'alpha@test.com',
            handle: 'user',
            createdAt: '2019-10-13T11:10:13.887Z',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/konnect-8dd5c.appspot.com/o/71831905358.jpg?alt=media',
            bio: 'Hello, I am Alpha',
            website: 'www.com',
            location: 'London, UK'
        }
    ],
    screams: [
        {
            userHandle: 'user',
            body: 'this is a scream body',
            createdAt: '2019-10-13T10:16:27.102Z',
            likeCount: 5,
            commentCount: 2
        }
    ]
};

const userDetails = {
    // Redux Data
    credentials = {
        userId: 'K0Z4GxLCVtgtANBxigTnf5Caot53',
        email: 'alpha@test.com',
        handle: 'user',
        createdAt: '2019-10-13T11:10:13.887Z',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/konnect-8dd5c.appspot.com/o/71831905358.jpg?alt=media',
        bio: 'Hello, I am Alpha',
        website: 'www.com',
        location: 'London, UK'
    },
    likes: [
        {
            userHandle: "user",
            screamId: "Owd39ZFi5L3ncV7mwvYY"
        },
        {
            userHandle: "user",
            screamId: "Owd39ZFi5L3ncV7mwvYY"
        }

    ]
}