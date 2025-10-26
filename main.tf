# terraform resource for creating an AWS S3 bucket and configration VPC
# Create a VPC
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
}