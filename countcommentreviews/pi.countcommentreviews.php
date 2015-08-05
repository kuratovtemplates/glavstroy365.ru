<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Memberlist Class
 *
 * @package     ExpressionEngine
 * @category        Plugin
 * @author      Jane Doe
 * @copyright       Copyright (c) 2010, Jane Doe
 * @link        http://example.com/memberlist/
 */

$plugin_info = array(
    'pi_name'         => 'Member Emails',
    'pi_version'      => '1.0',
    'pi_author'       => 'Konstantin Cherniak',
    'pi_author_url'   => 'http://galvstroy365.ru/',
    'pi_description'  => 'Count comment reviews',
    'pi_usage'        => Countcommentreviews::usage()
);

class Countcommentreviews
{

    public $return_data = "";

    // --------------------------------------------------------------------

    /**
     * Countcommentreviews
     *
     * This function returns a list of members
     *
     * @access  public
     * @return  string
     */
    public function __construct()
    {
        $type_review = '+';
        $entryid = '1';
        $type_review = ee()->TMPL->fetch_param('type_review');
        $entryid = ee()->TMPL->fetch_param('entryid');
        $query = ee()->db->select('COUNT(field_id_1) AS countr')
            ->where(array(
                'entry_id' => $entryid,
                'field_id_1' => $type_review,
            ))
            ->limit(1)
            ->get('comment_data');
        if ($query->num_rows() > 0)
        {
            foreach($query->result_array() as $row)
            {
                 $this->return_data .= $row['countr'];
            }
        }
       
        /*
        $group_id = "6";
        $group_id = ee()->TMPL->fetch_param('group_id');
        $query = ee()->db->select('email')
            ->where('group_id =', $group_id)
            ->get('members', 1000);
        $count=1;
        foreach($query->result_array() as $row)
        {
            $this->return_data .= $row['email'];
            if ( $count < $query->num_rows() ){
            $this->return_data .= ",";
            }
            $count++;
        }
        */
    }

    // --------------------------------------------------------------------

    /**
     * Usage
     *
     * This function describes how the plugin is used.
     *
     * @access  public
     * @return  string
     */
    public static function usage()
    {
        ob_start();  ?>

Countcommentreviews

    {exp:countcommentreviews type_review='+' entryid='111'}

This is an incredibly simple Plugin.
Parametrs: <br>
type_review +,- or 0 <br>
entryid <br>

    <?php
        $buffer = ob_get_contents();
        ob_end_clean();

        return $buffer;
    }
    // END
}
/* End of file pi.memberlist.php */
/* Location: ./system/expressionengine/third_party/memberlist/pi.memberlist.php */