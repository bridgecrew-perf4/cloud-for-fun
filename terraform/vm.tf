// Terraform plugin for creating random ids
resource "random_id" "instance_id" {
 byte_length = 8
}

// A single Compute Engine instance
resource "google_compute_instance" "default" {
 name         = "centos-vm-${random_id.instance_id.hex}"
 machine_type = "e2-micro"
 zone         = "europe-west1-b"

 boot_disk {
   initialize_params {
     image = "centos-cloud/centos-7"
   }
 }

// Make sure flask is installed on all new instances for later steps
#  metadata_startup_script = "sudo yum update; sudo yum upgrade -y"

 network_interface {
   network = "default"

   access_config {
     // Include this section to give the VM an external ip address
   }
 }
}