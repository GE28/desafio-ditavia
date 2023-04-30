import express from 'express';

const router = express.Router();

const url = 'http://localhost';
const port = process.env.SERVER_PORT;

router.get('/', async (req, res) => {
    try {
        const smartphones = await getAllSmartphones();
        res.render('home', { smartphones: parseSmartphoneReleaseDatesToHome(smartphones) });
    } catch (err) {
        console.error(err);
    }
});

router.get('/add-smartphone/:id', async (req, res) => {
    if (!isSmartphoneDataFilled(req)) {
        try {
            const data = await getSmartphone(req.params.id);
            return res.render('add-smartphone', { smartphone: data });
        } catch (err) {
            console.error(err);
        }
    } else {
        const data = getSmartphoneDataFromParams(req);

        try {
            const updated = await updateSmartphone(data, req.params.id);
            return res.redirect('/');
        } catch (err) {
            console.error(err);
        }
    } 
});

router.get('/add-smartphone', async (req, res) => {
    res.render('add-smartphone');
});

router.get('/create-smartphone', async (req, res) => {
    if (isSmartphoneDataFilled(req)) {
        const data = getSmartphoneDataFromParams(req);

        try {
            const created = await createSmartphone(data);
            return res.render('created-smartphone', { smartphone: created });
        } catch (err) {
            console.error(err);
        }
    } else {
        return res.redirect('/');
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        await deleteSmartphone(req.params.id);
        return res.render('deleted-smartphone', { id: req.params.id });
    } catch (err) {
        console.error(err);
    }
});

function isSmartphoneDataFilled(req) {
    const { model, brand, memoryCapacity, releaseDate } = req.query;

    return model && brand && memoryCapacity && releaseDate;
}

function getSmartphoneDataFromParams(req) {
    const { model, brand, memoryCapacity, releaseDate } = req.query;

    return {
        model,
        brand,
        memoryCapacity,
        releaseDate
    };
}

function parseSmartphoneReleaseDatesToHome(smartphones) {
    return smartphones.map(s => {
        const releaseDate = (new Date(s.releaseDate)).toLocaleDateString('en-US', { timeZone: 'UTC' });
        const day = releaseDate.split('/')[1].padStart(2, '0');
        const month = releaseDate.split('/')[0].padStart(2, '0');
        const year = releaseDate.split('/')[2];
        const formattedReleaseDate = `${day}/${month}/${year}`;
        return { ...s, releaseDate: formattedReleaseDate };
    });
}

function parseSmartphoneReleaseDate(smartphone) {
    const releaseDate = new Date(smartphone.releaseDate);
    const day = releaseDate.getDate().toString().padStart(2, '0');
    const month = (releaseDate.getMonth() + 1).toString().padStart(2, '0');
    const year = releaseDate.getFullYear();
    const formattedReleaseDate = `${year}-${month}-${day}`;
    return { ...smartphone, releaseDate: formattedReleaseDate };
}

async function getAllSmartphones() {
    try {
        const response = await fetch(`${url}:${port}/smartphone`);
        const data = await response.json();
        return data.map(s => parseSmartphoneReleaseDate(s));
    } catch (err) {
        console.error(err);
    }

}

async function getSmartphone(id) {
    try {
        const response = await fetch(`${url}:${port}/smartphone/${id}`);
        return parseSmartphoneReleaseDate(await response.json());
    } catch(err) {
        console.error(err);
    }
}

async function createSmartphone(data) {
    try {
        const response = await fetch(`${url}:${port}/smartphone`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const created = await response.json();
        return parseSmartphoneReleaseDate(created);
    } catch (err) {
        console.error(err);
    }
}

async function updateSmartphone(data, id) {
    try {
        const response = await fetch(`${url}:${port}/smartphone/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const updated = response.json();
        return parseSmartphoneReleaseDate(updated);
    } catch (err) {
        console.error(err);
    }
}

async function deleteSmartphone(id) {
    try {
        await fetch(`${url}:${port}/smartphone/${id}`, {
            method: 'DELETE'
        });
    } catch {
        console.error(err);
    }
}


export default router;