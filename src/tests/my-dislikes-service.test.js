import {
    userTogglesDislikeTuit,
    findUserDislikesTuit,
    findAllTuitsDislikedByUser
} from "../services/dislikes-service";

import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

import {
    createTuit,
    deleteTuit
} from "../services/tuits-service";

describe('can toggle dislike on a tuit with REST API', () => {
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

    test('can dislike a tuit previously not disliked', async() => {
        // Confirm this tuit has not been disliked by the user yet
        let userDislikedTuit = await findUserDislikesTuit(newUser._id, newTuit._id);
        expect(userDislikedTuit).toEqual(null);

        // Confirm that the tuit is now disliked by the user
        await userTogglesDislikeTuit(newUser._id, newTuit._id);
        userDislikedTuit = await findUserDislikesTuit(newUser._id, newTuit._id);
        expect(userDislikedTuit.tuit).toEqual(newTuit._id);
    })

    test('can un-dislike a tuit previously disliked', async() => {
        // Confirm that the tuit is already disliked by the user
        let userDislikedTuit = await findUserDislikesTuit(newUser._id, newTuit._id);
        expect(userDislikedTuit.tuit).toEqual(newTuit._id);

        // Confirm that the tuit is no longer disliked by the user
        await userTogglesDislikeTuit(newUser._id, newTuit._id);
        userDislikedTuit = await findUserDislikesTuit(newUser._id, newTuit._id);
        expect(userDislikedTuit).toEqual(null);
    })
})

describe('can retrieve all tuits a user has disliked with REST API', () => {
    let newUser;
    let newTuit1;
    let newTuit2;
    let dislikedTuits;
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

    test('can find all tuits disliked by user', async() => {
        dislikedTuits = await findAllTuitsDislikedByUser(newUser._id);
        expect(dislikedTuits.length).toEqual(0);
        await userTogglesDislikeTuit(newUser._id, newTuit1._id);
        await userTogglesDislikeTuit(newUser._id, newTuit2._id);
        dislikedTuits = await findAllTuitsDislikedByUser(newUser._id);
        expect(dislikedTuits.length).toEqual(2);
    })
})