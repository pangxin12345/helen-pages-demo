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
			"cmd /c start  D:\\ffmpeg\\bin\\ffmpeg -y -i F:\\MTV\\test\\[��ƿ]ÿ��һ��.Aaliyah.-.[Try.Again].mp4 -i D:\\water\\s-80-40.png -i D:\\water\\n-80-40.png -filter_complex overlay=x=if(lt(mod(t\\,20)\\,10)\\,10\\,NAN):y=10,overlay=x=if(gt(mod(t\\,20)\\,10)\\,10\\,NAN):y=10 F:\\MTV\\test\\1.mp4"
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