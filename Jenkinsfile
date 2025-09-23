pipeline{
    agent any 
    environment{
        DOCKER_IMAGE = 'rawan36/todo-api'
    }
    triggers {
        githubPush()
    }
    stages{
        stage('checkout'){
            steps{
              checkout scm

            }

        }
        
        stage('build docker image'){
            steps{
                sh """
                   docker build -t ${DOCKER_IMAGE}:lts . 
                  
                   """
            }

        }
        stage('push image to DockerHub'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'DockerHub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]){
                    sh """
                       echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
                       docker push ${DOCKER_IMAGE}:lts
                       docker logout
                       """
                }
            }
        }
    }
}