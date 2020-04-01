import shutil, random, os
dirpath1 = 'shoulder_data/train/0%'
destDirectory1 = 'shoulder_data/validation/0%'
dirpath2 = 'shoulder_data/train/12.5%'
destDirectory2 = 'shoulder_data/validation/12.5%'
dirpath3 = 'shoulder_data/train/25%'
destDirectory3 = 'shoulder_data/validation/25%'
dirpath4 = 'shoulder_data/train/37.5%'
destDirectory4 = 'shoulder_data/validation/37.5%'
dirpath5 = 'shoulder_data/train/50%'
destDirectory5 = 'shoulder_data/validation/50%'
dirpath6 = 'shoulder_data/train/62.5%'
destDirectory6 = 'shoulder_data/validation/62.5%'
dirpath7 = 'shoulder_data/train/75%'
destDirectory7 = 'shoulder_data/validation/75%'
dirpath8 = 'shoulder_data/train/87.5%'
destDirectory8 = 'shoulder_data/validation/87.5%'
dirpath9 = 'shoulder_data/train/100%'
destDirectory9 = 'shoulder_data/validation/100%'

filenames = random.sample(os.listdir(dirpath1), 112)
for fname in filenames:
    srcpath = os.path.join(dirpath1, fname)
    shutil.move(srcpath, destDirectory1)

filenames = random.sample(os.listdir(dirpath2), 112)
for fname in filenames:
    srcpath = os.path.join(dirpath2, fname)
    shutil.move(srcpath, destDirectory2)

filenames = random.sample(os.listdir(dirpath3), 112)
for fname in filenames:
    srcpath = os.path.join(dirpath3, fname)
    shutil.move(srcpath, destDirectory3)

filenames = random.sample(os.listdir(dirpath4), 112)
for fname in filenames:
    srcpath = os.path.join(dirpath4, fname)
    shutil.move(srcpath, destDirectory4)

filenames = random.sample(os.listdir(dirpath5), 112)
for fname in filenames:
    srcpath = os.path.join(dirpath5, fname)
    shutil.move(srcpath, destDirectory5)

filenames = random.sample(os.listdir(dirpath6), 112)
for fname in filenames:
    srcpath = os.path.join(dirpath6, fname)
    shutil.move(srcpath, destDirectory6)

filenames = random.sample(os.listdir(dirpath7), 112)
for fname in filenames:
    srcpath = os.path.join(dirpath7, fname)
    shutil.move(srcpath, destDirectory7)

filenames = random.sample(os.listdir(dirpath8), 112)
for fname in filenames:
    srcpath = os.path.join(dirpath8, fname)
    shutil.move(srcpath, destDirectory8)

filenames = random.sample(os.listdir(dirpath9), 112)
for fname in filenames:
    srcpath = os.path.join(dirpath9, fname)
    shutil.move(srcpath, destDirectory9)