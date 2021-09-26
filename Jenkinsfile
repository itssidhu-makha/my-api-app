pipeline{

    environment{
        imagename = "itssidhu/my-api-app"     
    }
    agent{
        label 'docker'
    }
    stages{

        stage('checkout from git'){
            steps{
            git branch: 'main', 
            credentialsId: 'GithubAccount',
            url: 'https://github.com/itssidhu-makha/my-api-app.git'
            }
        }

        stage('build the image'){
            steps{
                script{
                app = docker.build imagename                
                }
            }
          
        }

        stage('push the image'){
            steps{
                script{
                docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-login'){
                    app.push("$BUILD_NUMBER")
                    app.push("latest")
                }
                }
            }
        }

        stage('Run container port 2100'){
            steps{
                script{
                docker.image(imagename).run('-p 2100:8800'){
                    /* do things */
                }
                }
            }
        }

    }
}