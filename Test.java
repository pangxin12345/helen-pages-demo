import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 *  * @author pangxin1
 *   * @date 2019/1/23 11:54 PM
 *    */
public class Test {
    public static void main(String[] args) throws IOException, InterruptedException {
        String[] command = new String[]{
			"cmd /c D:\\helen-pages-demo\\run.bat",
				"cmd /c  D:\\helen-pages-demo\\run.bat",
				"cmd /c  D:\\helen-pages-demo\\run.bat"
        };

        for (String s : command) {
            Process p = Runtime.getRuntime().exec(s);
            InputStream is = p.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            p.waitFor();
            is.close();
            reader.close();
            p.destroy();
        }
    }
}