pipeline{
    agent{
        label 'docker'
    }
    stages{

        stage('checkout'){
            steps{
            git branch: 'main', 
            credentialsId: 'GithubAccount',
            url: 'https://github.com/itssidhu-makha/my-api-app.git'
            }
        }

        stage('build'){
            steps{
                script{
                app = docker.build("itssidhu/my-api-app")
                }
            }
          
        }

        stage('Test'){
            steps{
                script{
                app.inside{
                sh 'echo "image has been build successfully"'
                }
                }
            }
           
        }

        stage('push'){
            steps{
                script{
                docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
                    app.push("${env.BUILD_NUMBER}")
                    app.push("latest")
                }
                }
            }
        }

        stage('Run'){
            steps{
                script{
                docker.image('itssidhu/my-api-app').withRun('-p 2100:8800'){
                    /* do things */
                }
                }
            }
        }

    }
}