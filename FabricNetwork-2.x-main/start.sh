cd ./artifacts/channel/create-certificate-with-ca
docker-compose up -d

cd ..
cd ..

docker-compose up -d
cd ..
ls
./createChannel.sh
./deployChaincode.sh
cd api-2.0

nodemon app.js




