// Terraform plugin for creating random ids
resource "google_compute_address" "static" {
  count = "${var.instance_count}" 
  name = format("ipv4-address-%s", count.index)
}

// Small compute engine located in belgium
resource "google_compute_instance" "default" {
 count = "${var.instance_count}"
 name         = format("centos-vm-%s", count.index)
 machine_type = "${var.instance_type}"
 zone         = "${var.zone}"

 boot_disk {
   initialize_params {
     image = "centos-cloud/centos-7"
   }
 }

 network_interface {
   network = "default"

   access_config {
      nat_ip = "${google_compute_address.static[count.index].address}"
   }
 }
}