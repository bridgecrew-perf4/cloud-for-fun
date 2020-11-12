// Terraform plugin for creating random ids
resource "random_id" "instance_id" {
 byte_length = 8
}

// Small compute engine located in belgium
resource "google_compute_instance" "default" {
 name         = "centos-vm-${random_id.instance_id.hex}"
 machine_type = "e2-micro"
 zone         = "europe-west1-b"

 boot_disk {
   initialize_params {
     image = "centos-cloud/centos-7"
   }
 }

 network_interface {
   network = "default"

   access_config {
     // Include this section to give the VM an external ip address
   }
 }
}