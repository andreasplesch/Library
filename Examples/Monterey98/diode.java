import vrml.*;
import vrml.field.*;
import vrml.node.*;

public class diode extends Script {
  private SFBool passed;

  public void initialize() {
    passed = (SFBool)getEventOut("passed");
    //System.out.println("Diode initialized");
  }

  public void processEvent (Event e) {
    //System.out.println("processEvent: " + e.getName());
    if (e.getName().equals("filter")) {
      ConstSFBool v = (ConstSFBool)e.getValue();
      if (v.getValue()) {
        //System.out.println("True");
        passed.setValue(true);
      }
    }
  }
}
