//selection sort
import java.util.*;
public class SelectionSort
{
	public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int[] arr={12,34,56,21,11};
        int n=arr.length;
        for(int i=0;i<n-1;i++){
            int minI=i;
            for(int j=i+1;j<n;j++){
                if(arr[j]<arr[minI]){
                    minI=j;
                }
            }
        int temp = arr[i];
        arr[i] = arr[minI];
        arr[minI] = temp;
        }
        System.out.println("Sorted array is ");
        for(int i=0;i<n;i++){
            System.out.print(arr[i]+" ");
        }
	}
}
