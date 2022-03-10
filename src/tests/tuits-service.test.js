import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

import {
    createTuit,
    deleteTuit,
    findTuitById,
    findAllTuits,
    deleteTuitsByAuthor,
} from "../services/tuits-service";

describe('can create tuit with REST API', () => {
    let newUser;
    let newTuit
    const testUser = {
        username: 'testUser',
        password: 'test',
        email: "test@test.com"
    }
    const testTuit = {
        tuit: "this is a test tuit"
    }
    beforeAll(async () => {
        await deleteUsersByUsername(testUser.username);
        newUser = await createUser(testUser);
        newTuit = await createTuit(newUser._id, testTuit);
    })
    afterAll(async () => {
        await deleteUsersByUsername(testUser.username);
        await deleteTuit(newTuit._id);
    })

    test('can insert new tuits using REST API', async () => {
        // find the tuit to execute the populate
        const fetchedNewTuit = await findTuitById(newTuit._id);
        expect(fetchedNewTuit.tuit).toEqual(testTuit.tuit);
        expect(fetchedNewTuit.postedBy._id).toEqual(newUser._id);
    })
});

describe('can delete tuit with REST API', () => {
    let newUser;
    let newTuit;
    const testUser = {
        username: 'testUser',
        password: 'test',
        email: "test@test.com"
    }
    const testTuit = {
        tuit: "this is a test tuit"
    }
    beforeAll(async () => {
        await deleteUsersByUsername(testUser.username);
        newUser = await createUser(testUser);
        newTuit = await createTuit(newUser._id, testTuit);
    })
    afterAll(async () => {
        await deleteTuit(newTuit._id);
        await deleteUsersByUsername(testUser.username);
    })
    test('can delete users from REST API by tid', async () => {
        const deleteStatus = await deleteTuit(newTuit._id);
        expect(deleteStatus.deletedCount).toBeGreaterThanOrEqual(1);
    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    let newUser;
    let newTuit;
    const testUser = {
        username: 'testUser',
        password: 'test',
        email: "test@test.com"
    }
    const testTuit = {
        tuit: "this is a test tuit",
    }
    beforeAll(async () => {
        await deleteUsersByUsername(testUser.username);
        newUser = await createUser(testUser);
        newTuit = await createTuit(newUser._id, testTuit);
    })
    afterAll(async () => {
        await deleteTuit(newTuit._id);
        await deleteUsersByUsername(testUser.username);
    })

    test('can find a tuit by its primary key', async () => {
        expect(newTuit.tuit).toEqual(testTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);

        // find the tuit to execute populate
        const retrievedTuit = await findTuitById(newTuit._id);
        expect(retrievedTuit.tuit).toEqual(testTuit.tuit);
        expect(retrievedTuit.postedBy._id).toEqual(newUser._id);
    })
});

describe('can retrieve all tuits with REST API', () => {
    let newUser;
    const tuits = ["tuit1", "tuit2", "tuit3"];
    const testUser = {
        username: 'testUser',
        password: 'test',
        email: "test@test.com"
    }
    beforeAll(async () => {
        await deleteUsersByUsername(testUser.username);
        newUser = await createUser(testUser);
        await createTuit(newUser._id, {tuit: tuits[0]});
        await createTuit(newUser._id, {tuit: tuits[1]});
        await createTuit(newUser._id, {tuit: tuits[2]});
    })
    afterAll(async () => {
        await deleteUsersByUsername(testUser.username);
        await deleteTuitsByAuthor(newUser._id);
    })

    test('can find all tuits', async () => {
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
    })
});