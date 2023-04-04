-- CreateTable
CREATE TABLE `FormGirdisiExample` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(45) NOT NULL,
    `date_and_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IsletmeSuyuKontrolu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ph` VARCHAR(45) NOT NULL,
    `sertlik` VARCHAR(45) NOT NULL,
    `bikarbonat` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IcmeSuyuTesisiKontrolFormu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hamsusayac` VARCHAR(45) NOT NULL,
    `hamsuTonGun` VARCHAR(45) NOT NULL,
    `uretilenSuTonGun` VARCHAR(45) NOT NULL,
    `klorCozHazir` VARCHAR(45) NOT NULL,
    `klorAnalizSonucuMgL` VARCHAR(45) NOT NULL,
    `genelTemizlik` VARCHAR(45) NOT NULL,
    `aciklama` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YemekhaneVeKullanmaSuyu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `klorCozeltisiDozaji` VARCHAR(45) NOT NULL,
    `klor` VARCHAR(45) NOT NULL,
    `ph` VARCHAR(45) NOT NULL,
    `iletkenlik` VARCHAR(45) NOT NULL,
    `genelTemizlik` VARCHAR(45) NOT NULL,
    `aciklama` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TuzSodaSayacToplama` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(45) NOT NULL,
    `date_and_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `uretilenSu` VARCHAR(45) NOT NULL,
    `tasviyedeKullanilanSiviTuzSayac` VARCHAR(45) NOT NULL,
    `tuzVeSodaTesisiKullanilanSuSayac` VARCHAR(45) NOT NULL,
    `isletmeyeVerilenSiviTuzSayac` VARCHAR(45) NOT NULL,
    `isletmeyeVerilenSiviTuzHazirlananTankSayisi` VARCHAR(45) NOT NULL,
    `hazirlananSiviSodaSayac` VARCHAR(45) NOT NULL,
    `siviSodaHattiYikamSuyuSayac` VARCHAR(45) NOT NULL,
    `kayiSodaKg` VARCHAR(45) NOT NULL,
    `siviSodaLt` VARCHAR(45) NOT NULL,
    `aritmaTesisineAtilanAtikSiviTuzuLt` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TuzVeSodaTesisiGunlukTuketimMiktarlari` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(45) NOT NULL,
    `date_and_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `gelenKatiTuzKg` VARCHAR(45) NOT NULL,
    `siviTuzHazirlamadaKullanilanSulfurikAsitKg` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TuzVeSodaTesisiGunlukTuketimMiktarlariAylikVeYillikToplam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(45) NOT NULL,
    `date_and_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SodyumKlorurGirdiKontrolAnalizSonuclari` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(45) NOT NULL,
    `date_and_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `gorunum` VARCHAR(45) NOT NULL,
    `sertlik` VARCHAR(45) NOT NULL,
    `demir` VARCHAR(45) NOT NULL,
    `irsaliyeNo` VARCHAR(45) NOT NULL,
    `miktarKg` VARCHAR(45) NOT NULL,
    `firma` VARCHAR(45) NOT NULL,
    `kabul` VARCHAR(45) NOT NULL,
    `iade` VARCHAR(45) NOT NULL,
    `aciklama` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TuzTesisiKontrolCizelgesi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(45) NOT NULL,
    `date_and_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `cozeltiSertligi` VARCHAR(45) NOT NULL,
    `ph` VARCHAR(45) NOT NULL,
    `yogunluk` VARCHAR(45) NOT NULL,
    `bikarbonat` VARCHAR(45) NOT NULL,
    `kontrolEden` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SodaTesisiKontrolFormu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(45) NOT NULL,
    `date_and_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `cozeltiYogunlugu` VARCHAR(45) NOT NULL,
    `kontrolEden` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
