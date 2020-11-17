echo "[centos-gcloud]" > inventory
gcloud compute addresses list | awk {'print $2'} | grep -v "ADDRESS" >> inventory

echo >> inventory
echo "[centos-gcloud:vars]" >> inventory
echo "ansible_ssh_user=manu" >> inventory
echo "ansible_ssh_private_key_file=/home/manu/.ssh/ir_rsa" >> inventory
echo "ansible_ssh_common_args='-o StrictHostKeyChecking=no'" >> inventory
