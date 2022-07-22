// @ts-nocheck

import express from 'express';
import { db } from '../db';

export const router = express.Router();

router.post('/admin/login', async function (req, res) {
  const { email, password } = req.body as { email: string; password: string };

  const admin = await db.admin.findFirst({
    where: {
      email,
    },
  });

  if (!admin) {
    return res.sendStatus(404);
  }

  if (admin.password !== password) {
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
});

router.post('/mahasiswa', async function (req, res) {
  const { npm, password, kelas, nama } = req.body;

  /**
   * pastikan tidak ada mahasiswa yang sama
   */
  const mhs = await db.mahasiswa.findFirst({
    where: {
      npm,
    },
  });

  if (mhs) {
    return res.sendStatus(400);
  }

  const mahasiswa = await db.mahasiswa.create({
    data: {
      npm,
      kelas,
      nama,
      password,
    },
  });

  return res.status(200).send({
    id: mahasiswa.id,
  });
});

router.post('/kursus', async function (req, res) {
  const { namaKursus, keteranganKursus, lamaKursus } = req.body;

  const kursus = await db.kursus.create({
    data: {
      namaKursus,
      keteranganKursus,
      lamaKursus,
    },
  });

  return res.status(200).send({
    id: kursus.id,
  });
});

router.post('/jadwalKursus', async function (req, res) {
  const { idKursus, idMahasiswa, waktuKursus } = req.body;

  const jadwalKursus = await db.jadwalKursus.create({
    data: {
      waktuKursus,
      idKursus,
      idMahasiswa,
      terverifikasi: false,
    },
  });
});

// get all resource
router.get('/mahasiswa', async function (req, res) {
  const mhss = await db.mahasiswa.findMany({
    select: {
      id: true,
      kelas: true,
      nama: true,
      npm: true,
    },
  });

  return res.status(200).send(mhss);
});

router.get('/kursus', async function (req, res) {
  const kursuss = await db.kursus.findMany({
    select: {
      id: true,
      namaKursus: true,
      keteranganKursus: true,
      lamaKursus: true,
    },
  });

  return res.status(200).send(kursuss);
});

router.get('/jadwalKursus', async function (req, res) {
  const jadwalKursuss = await db.jadwalKursus.findMany({
    select: {
      id: true,
      terverifikasi: true,
      waktu: true,
      kursus: {
        select: {
          namaKursus: true,
        },
      },
    },
  });

  return res.status(200).send(jadwalKursuss.map((e) => e.waktu.toISOString()));
});

// get resource by id

router.get('/mahasiswa/:id', async function (req, res) {
  const mhss = await db.mahasiswa.findFirst({
    select: {
      id: true,
      kelas: true,
      nama: true,
      npm: true,
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!mhss) {
    return res.sendStatus(404);
  }

  return res.status(200).send(mhss);
});

router.get('/kursus/:id', async function (req, res) {
  const kursuss = await db.kursus.findFirst({
    select: {
      id: true,
      namaKursus: true,
      keteranganKursus: true,
      lamaKursus: true,
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!kursuss) {
    return res.sendStatus(404);
  }

  return res.status(200).send(kursuss);
});

router.get('/jadwalKursus/:id', async function (req, res) {
  const jadwalKursuss = await db.jadwalKursus.findFirst({
    select: {
      id: true,
      terverifikasi: true,
      waktu: true,
      kursus: {
        select: {
          namaKursus,
        },
      },
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!jadwalKursuss) {
    return res.sendStatus(404);
  }

  return res.status(200).send(jadwalKursuss);
});

// edit resource by id

router.put('/mahasiswa/:id', async function (req, res) {
  const mhss = await db.mahasiswa.findFirst({
    select: {
      id: true,
      kelas: true,
      nama: true,
      npm: true,
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!mhss) {
    return res.sendStatus(404);
  }

  const { nama, npm, kelas } = req.body;

  await db.mahasiswa.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      nama,
      npm,
      kelas,
    },
  });

  return res.sendStatus(200);
});

router.put('/kursus/:id', async function (req, res) {
  const kursuss = await db.kursus.findFirst({
    select: {
      id: true,
      namaKursus: true,
      keteranganKursus: true,
      lamaKursus: true,
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!kursuss) {
    return res.sendStatus(404);
  }

  const { namaKursus, lamaKursus, keteranganKursus } = req.body;

  await db.kursus.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      namaKursus,
      lamaKursus,
      keteranganKursus,
    },
  });

  return res.sendStatus(200);
});

router.put('/jadwalKursus/:id', async function (req, res) {
  const jadwalKursuss = await db.jadwalKursus.findFirst({
    select: {
      id: true,
      terverifikasi: true,
      waktu: true,
      kursus: {
        select: {
          namaKursus,
        },
      },
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!jadwalKursuss) {
    return res.sendStatus(404);
  }

  const { terverifikasi, waktu } = req.body;

  await db.jadwalKursus.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      terverifikasi,
      waktu: new Date(waktu),
    },
  });
});

// delete resource by id

router.delete('/mahasiswa/:id', async function (req, res) {
  const mhss = await db.mahasiswa.findFirst({
    select: {
      id: true,
      kelas: true,
      nama: true,
      npm: true,
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!mhss) {
    return res.sendStatus(404);
  }

  await db.mahasiswa.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  return res.sendStatus(200);
});

router.delete('/kursus/:id', async function (req, res) {
  const kursuss = await db.kursus.findFirst({
    select: {
      id: true,
      namaKursus: true,
      keteranganKursus: true,
      lamaKursus: true,
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!kursuss) {
    return res.sendStatus(404);
  }

  await db.kursus.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  return res.sendStatus(200);
});

router.delete('/jadwalKursus/:id', async function (req, res) {
  const jadwalKursuss = await db.jadwalKursus.findFirst({
    select: {
      id: true,
      terverifikasi: true,
      waktu: true,
      kursus: {
        select: {
          namaKursus,
        },
      },
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!jadwalKursuss) {
    return res.sendStatus(404);
  }

  await db.jadwalKursus.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
});
