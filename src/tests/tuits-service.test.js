import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

import {
    createTuit,
    deleteTuit,
    findTuitById,
    findAllTuits,
    deleteTuitsByAuthor
} from "../services/tuits-service";

describe('can create tuit with REST API', () => {
    const testUser = {
        username: 'testUser',
        password: 'test',
        email: "test@test.com"
    }
    const testTuit = {
        tuit: "this is a test tuit"
    }
    beforeEach(() => {
        return deleteUsersByUsername(testUser.username);
    })

    afterEach(() => {
        return deleteUsersByUsername(testUser.username);
    })
    test('can insert new tuits using REST API', async () => {
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, testTuit);
        // find the tuit to execute the populate
        const fetchedNewTuit = await findTuitById(newTuit._id);
        expect(fetchedNewTuit.tuit).toEqual(testTuit.tuit);
        // Creating a tuit in postman populates the postedBy correctly, but is always null here
        expect(fetchedNewTuit.postedBy._id).toEqual(newUser._id);
        // delete the test tuit
        await deleteTuit(newTuit._id);
    })
});

describe('can delete tuit with REST API', () => {
    const testUser = {
        username: 'testUser',
        password: 'test',
        email: "test@test.com"
    }
    const testTuit = {
        tuit: "this is a test tuit"
    }
    beforeEach(() => {
        return deleteUsersByUsername(testUser.username);
    })

    afterEach(() => {
        return deleteUsersByUsername(testUser.username);
    })
    test('can delete users from REST API by tid', async () => {
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, testTuit);
        const deleteStatus = await deleteTuit(newTuit._id);
        expect(deleteStatus.deletedCount).toBeGreaterThanOrEqual(1);
        // delete the test tuit
        await deleteTuit(newTuit._id);
    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const testUser = {
        username: 'testUser',
        password: 'test',
        email: "test@test.com"
    }
    const testTuit = {
        tuit: "this is a test tuit",
    }
    beforeEach(() => {
        return deleteUsersByUsername(testUser.username);
    })

    afterEach(() => {
        return deleteUsersByUsername(testUser.username);
    })
    test('can find a tuit by its primary key', async () => {
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, testTuit);
        expect(newTuit.tuit).toEqual(testTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);

        // find the tuit to execute populate
        const retrievedTuit = await findTuitById(newTuit._id);
        expect(retrievedTuit.tuit).toEqual(testTuit.tuit);
        expect(retrievedTuit.postedBy._id).toEqual(newUser._id);
        // delete the test tuit
        await deleteTuit(newTuit._id);
    })
});

describe('can retrieve all tuits with REST API', () => {
    const tuits = ["tuit1", "tuit2", "tuit3"];
    const testUser = {
        username: 'testUser',
        password: 'test',
        email: "test@test.com"
    }
    beforeEach(() => {
        return deleteUsersByUsername(testUser.userncame);
    })

    afterEach(() => {
        return deleteUsersByUsername(testUser.username);
    })

    test('can find all tuits', async () => {
        const newUser = await createUser(testUser);
        await createTuit(newUser._id, {tuit: tuits[0]});
        await createTuit(newUser._id, {tuit: tuits[1]});
        await createTuit(newUser._id, {tuit: tuits[2]});
        const retrievedTuits = await findAllTuits();
        expect(retrievedTuits.length).toBeGreaterThanOrEqual(tuits.length);

        // Get the tuits that we inserted
        const insertedTuits = retrievedTuits.filter(tuit =>
            tuit.postedBy._id === newUser._id
        )

        insertedTuits.forEach(tuit => {
            const tuitContent = tuits.find(testTuit => testTuit === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitContent);
            expect(tuit.postedBy._id).toEqual(newUser._id);
        })

        // Delete all the test tuits
        await deleteTuitsByAuthor(newUser._id);
    })
});