// Insertion Sort 
class Main {
    public static void main(String[] args) {
        int[] arr = {86,92,43,19,11};

        for (int i = 1; i < arr.length; i++) {
            int temp = arr[i];  
            int j = i - 1;
            
            while (j >= 0 && arr[j] > temp) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = temp;
            
            System.out.print("After pass " + i + ": ");
            for (int k = 0; k < arr.length; k++) {
                System.out.print(arr[k] + " ");
            }
            System.out.println();
        }
        System.out.println("Sorted Array :");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}
