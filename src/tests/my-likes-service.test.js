import {
    userTogglesTuitLikes,
    findUserLikesTuit,
    findAllTuitsLikedByUser
} from "../services/likes-service";

import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

import {
    createTuit,
    deleteTuit
} from "../services/tuits-service";

describe('can toggle like on a tuit with REST API', () => {
    let newUser;
    let newTuit
    const testUser = {
        username: 'notARealUser',
        password: 'test',
        email: "not@real.com"
    }
    const testTuit = {
        tuit: "this is a test tuit"
    }
    beforeAll(async() => {
        await deleteUsersByUsername(testUser.username);
        newUser = await createUser(testUser);
        newTuit = await createTuit(newUser._id, testTuit);
    })

    afterAll(async() => {
        await deleteUsersByUsername(testUser.username);
        await deleteTuit(newTuit._id);
    })

    test('can like a tuit not previously liked by the user', async() => {
        // Confirm this tuit has not been liked by the user yet
        let userLikedTuit = await findUserLikesTuit(newUser._id, newTuit._id);
        expect(userLikedTuit).toEqual(null);

        // Confirm that the tuit is now liked by the user
        await userTogglesTuitLikes(newUser._id, newTuit._id);
        userLikedTuit = await findUserLikesTuit(newUser._id, newTuit._id);
        expect(userLikedTuit.tuit).toEqual(newTuit._id);
    })

    test('can unlike a tuit previously liked by the user', async() => {
        // Confirm that the tuit has already been liked by the user
        let userLikedTuit = await findUserLikesTuit(newUser._id, newTuit._id);
        expect(userLikedTuit.tuit).toEqual(newTuit._id);

        // Confirm that the tuit is no longer liked by the user
        await userTogglesTuitLikes(newUser._id, newTuit._id);
        userLikedTuit = await findUserLikesTuit(newUser._id, newTuit._id);
        expect(userLikedTuit).toEqual(null);
    })
})

describe('can retrieve all tuits a user has liked with REST API', () => {
    let newUser;
    let newTuit1;
    let newTuit2;
    let likedTuits;
    const testUser = {
        username: 'notARealUser',
        password: 'test',
        email: "not@real.com"
    }
    const testTuit1 = {
        tuit: "test tuit 1"
    }
    const testTuit2 = {
        tuit: "test tuit 2"
    }

    beforeAll(async() => {
        await deleteUsersByUsername(testUser.username);
        newUser = await createUser(testUser);
        newTuit1 = await createTuit(newUser._id, testTuit1);
        newTuit2 = await createTuit(newUser._id, testTuit2);
    })

    afterAll(async() => {
        await deleteUsersByUsername(testUser.username);
        await deleteTuit(newTuit1._id);
        await deleteTuit(newTuit2._id);
    })

    test('can find all tuits liked by user', async() => {
        likedTuits = await findAllTuitsLikedByUser(newUser._id);
        expect(likedTuits.length).toEqual(0);
        await userTogglesTuitLikes(newUser._id, newTuit1._id);
        await userTogglesTuitLikes(newUser._id, newTuit2._id);
        likedTuits = await findAllTuitsLikedByUser(newUser._id);
        expect(likedTuits.length).toEqual(2);
    })
});