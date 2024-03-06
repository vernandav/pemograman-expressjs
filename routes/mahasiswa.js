var express = require('express');
var router = express.Router();

var connection = require('../config/database.js');

const model_mahasiswa = require('../model/model_mahasiswa.js');
const { writeData } = require('../model/model_kategori.js');

router.get('/', async function(req, res, next){
    let rows = await model_mahasiswa.getAll();  
    res.render('mahasiswa/index',{
        data: rows
    });
});

//router create
router.get('/create', function (req, res, next){
    res.render('mahasiswa/create', {
        nama_mahasiswa: ''
    })
})
//router store
router.post('/store', async function(req, res, next){
    try{
        let {nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telepon, asal_sekolah, tahun_lulus} = req.body;
        let Data = {
            nrp, 
            nama_depan, 
            nama_belakang, 
            jenis_kelamin, 
            agama, 
            umur, 
            tinggi_badan, 
            gol_darah, 
            alamat, 
            hobi, 
            email, 
            no_telepon, 
            asal_sekolah, 
            tahun_lulus,
        };
        connection.query('insert into mahasiswa set ?', Data, function(err, result) {
            if(err){
                console.log(err)
            }else{
                req.flash('success', 'Berhasil menyimpan data!');
            }
            res.redirect('/mahasiswa');
        })
    } catch {
    req. flash('error', 'Terjadi kesalahan pada fungsi')
    res.redirect('/mahasiswa');
    }
})
//router edit
router.get('/edit/(:id)', async function(req, res, next){
    let id = req.params.id;
    connection.query('select * from mahasiswa where id_mahasiswa =' + id, (err, rows) => {
            if (err) {
                req.flash('error', 'query gagal!');
            } else {
                res.render('mahasiswa/edit', {
                    id: rows[0].id_mahasiswa,
                    nrp: rows[0].nrp,
                    nama_depan: rows[0].nama_depan,
                    nama_belakang: rows[0].nama_belakang,
                    jenis_kelamin: rows[0].jenis_kelamin,
                    agama: rows[0].agama,
                    umur: rows[0].umur,
                    tinggi_badan: rows[0].tinggi_badan,
                    gol_darah: rows[0].gol_darah,
                    alamat: rows[0].alamat,
                    hobi: rows[0].hobi,
                    email: rows[0].email,
                    no_telepon: rows[0].no_telepon,
                    asal_sekolah: rows[0].asal_sekolah,
                    tahun_lulus: rows[0].tahun_lulus,
                });
            }
        })
})
//router update
router.post('/update/(:id)', async function(req, res, next) {
    try{
        let id = req.params.id
        let {nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telepon, asal_sekolah, tahun_lulus} = req.body;
        let Data = {
            nrp, 
            nama_depan, 
            nama_belakang, 
            jenis_kelamin, 
            agama, 
            umur, 
            tinggi_badan, 
            gol_darah, 
            alamat, 
            hobi, 
            email, 
            no_telepon, 
            asal_sekolah, 
            tahun_lulus,
        };
        connection.query('update mahasiswa set ? where id_mahasiswa = ' + id, Data, function(err){
            if(err){
                console.log(err)
            }
            else{
                req.flash('success','sukses memperbarui data');
            }
            res.redirect('/mahasiswa');
        })
    }
    catch{
        req.flash('error','terjadi kesalahan pada fungsi');
        res.redirect('/mahasiswa');
    }
})
//delete
router.get('/delete/(:id)', async function(req, res, next){
    let id = req.params.id;
    connection.query('delete from mahasiswa where id_mahasiswa = ' + id,function(err,rows){
        if(err){
            req.flash('error','Query gagal!');
        }else{
            req.flash('success','Berhasil menghapus data');
        }
        res.redirect('/mahasiswa')
    });
});

module.exports = router;